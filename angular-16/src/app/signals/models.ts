export interface Department {
  name: string;
}

export interface Person {
  id: number;
  name: string;
  department: string;
}

export interface Member {
  login: string;
  avatar_url: string;
  html_url: string;
  starred_url: string;
}
