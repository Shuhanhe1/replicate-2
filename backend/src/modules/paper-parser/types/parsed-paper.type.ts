export interface ParsedPaper {
  title: string;
  experiments: {
    title: string;
    items: { material: string; supplier: string; usage: string }[];
    methodologies: { text: string }[];
    instructions: { text: string }[];
  }[];
}
