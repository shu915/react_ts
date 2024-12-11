export interface UserType {
  id: number;
  name: string;
  role: string;
  email: string;
  age: number | undefined;
  postCode: string;
  phone: string;
  hobbies: string[] | undefined;
  url: string;
  studyMinutes?: number;
  taskCode?: number;
  studyLangs?: string[]| undefined;
  score?: number;
  experienceDays?: number;
  useLangs?: string[] | undefined;
  availableStartCode?: number;
  availableEndCode?: number;
} 