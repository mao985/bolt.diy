import { BaseProvider, getOpenAILikeModel } from '~/lib/modules/llm/base-provider';
import type { ModelInfo } from '~/lib/modules/llm/types';
import type { IProviderSetting } from '~/types/model';
import type { LanguageModelV1 } from 'ai';

export default class SiniconflowProvider extends BaseProvider {
  name = 'Siliconflow';
  getApiKeyLink = undefined;

  config = {
    baseUrlKey: 'https://api.siliconflow.cn/v1',
    apiTokenKey: 'sk-giidthxdcsjwvyzirtlweiyxxbgrperrweyzgjngtkejpita',
  };

  staticModels: ModelInfo[] = [];

  async getDynamicModels(
    apiKeys?: Record<string, string>,
    settings?: IProviderSetting,
    serverEnv: Record<string, string> = {},
  ): Promise<ModelInfo[]> {
    console.log('apiKeys:', apiKeys);
    console.log('providerSettings:', settings);
    console.log('serverEnv:', serverEnv);
    const { baseUrl, apiKey } = this.getProviderBaseUrlAndKey({
      apiKeys,
      providerSettings: settings,
      serverEnv,
      defaultBaseUrlKey: 'https://api.siliconflow.cn/v1',
      defaultApiTokenKey: 'sk-giidthxdcsjwvyzirtlweiyxxbgrperrweyzgjngtkejpita',
    });



    // if (!baseUrl || !apiKey) {
    //   return [];
    // }

    const response = await fetch(`https://api.siliconflow.cn/v1/models`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const res = (await response.json()) as any;

    return res.data.map((model: any) => ({
      name: model.id,
      label: model.id,
      provider: this.name,
      maxTokenAllowed: 8000,
    }));
  }

  getModelInstance(options: {
    model: string;
    serverEnv: Env;
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
  }): LanguageModelV1 {
    const { model, serverEnv, apiKeys, providerSettings } = options;

    const { baseUrl, apiKey } = this.getProviderBaseUrlAndKey({
      apiKeys,
      providerSettings: providerSettings?.[this.name],
      serverEnv: serverEnv as any,
      defaultBaseUrlKey: 'https://api.siliconflow.cn/v1',
      defaultApiTokenKey: 'sk-giidthxdcsjwvyzirtlweiyxxbgrperrweyzgjngtkejpita',
    });



    return getOpenAILikeModel('https://api.siliconflow.cn/v1', apiKey, model);
  }
}
