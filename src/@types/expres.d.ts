// Por que eu estou declarando namespace "Express"
// Porque eu quero sobescrever uma tipagem do "Express"
declare namespace Express {
  // esse método aplica uma adição no "Request" que já existe
  export interface Request {
    user: {
      id: string;
    };
  }
}
