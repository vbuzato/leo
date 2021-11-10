import type { UserProps } from '../components/form/form-types';

function getUsers(): UserProps[] | [] {
  const users = localStorage.getItem('users');
  return (users) ? JSON.parse(users) : [];
}

function removeUser(cpf: string): void {
  const users = getUsers().filter((user) => user.cpf !== cpf);
  localStorage.setItem('users', JSON.stringify(users));
}

function getUser(cpf: string): UserProps | undefined {
  return getUsers().find((user) => user.cpf === cpf);
}

function updateUser(user: UserProps) {
  const users = getUsers().filter((eachUser) => eachUser.cpf !== user.cpf);
  const updatedUsersList = [...users, user];
  localStorage.setItem('users', JSON.stringify(updatedUsersList));
}

function saveUser(user: UserProps): void {
  const isAnExistentUser = getUser(user.cpf);
  if (isAnExistentUser) {
    updateUser(user);
  } else {
    const users = [...getUsers(), user];
    localStorage.setItem('users', JSON.stringify(users));
  }
}

export {
  saveUser,
  getUser,
  getUsers,
  removeUser,
};
