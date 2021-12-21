const ID_LENGTH = 4;
const ID_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export const randomId = (): string => {
  let id = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    id += ID_CHARS.charAt(Math.floor(Math.random() * ID_CHARS.length));
  }
  return id;
};
