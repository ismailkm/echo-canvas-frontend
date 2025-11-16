export interface IntentData {
  [key: string]: string;
}

export interface PromptComponents {
  [key: string]: string;
}

export interface BaseImageDetails {
  id: string;
  image_url: string;
  gcs_uri: string;
  intent_data: IntentData;
  prompt_components: PromptComponents;
  version_number: number;
}

export interface Version extends BaseImageDetails {
  prompt: string;
}

export interface Session extends BaseImageDetails {
  base_prompt: string;
  versions: Omit<Version, 'id'>[];
}