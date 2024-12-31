export interface ExperimentItemData {
  id: string;
  material?: string;
  supplier?: string;
  usage?: string;
  url?: string;
}

export interface UpdateExperimentItem {
  id: string;
  data: Omit<ExperimentItemData, 'id'>;
}

export interface UpdateExperimentData {
  id: string;
  data: {
    title: string;
    items: UpdateExperimentItem[];
  };
}
