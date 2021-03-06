/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ScmIntegration, ScmIntegrationFactory } from '../types';
import { AzureIntegrationConfig, readAzureIntegrationConfigs } from './config';

export class AzureIntegration implements ScmIntegration {
  static factory: ScmIntegrationFactory = ({ config }) => {
    const configs = readAzureIntegrationConfigs(
      config.getOptionalConfigArray('integrations.azure') ?? [],
    );
    return configs.map(integration => ({
      predicate: (url: URL) => url.host === integration.host,
      integration: new AzureIntegration(integration),
    }));
  };

  constructor(private readonly config: AzureIntegrationConfig) {}

  get type(): string {
    return 'azure';
  }

  get title(): string {
    return this.config.host;
  }
}
