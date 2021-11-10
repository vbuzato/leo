function isValidName(name: string) {
  if (name !== '' && name.match(/[a-zA-Z]+/)) {
    return true;
  }

  return false;
}
function isValidCpf(cpf: string) {
  // Aqui falta a verificação do número para saber se é realmente um CPF válido
  // Está sendo testado apenas o formato
  if (cpf !== '' && cpf.match(/^\d{3}.\d{3}.\d{3}-\d{2}$/)) {
    return true;
  }

  return false;
}
function isValidPhone(phone: string) {
  if (phone !== '' && phone.match(/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/)) {
    return true;
  }

  return false;
}
function isValidEmail(email: string) {
  if (email !== '' && email.match(/\S+@\S+\.\S+/)) {
    return true;
  }
  return false;
}

export {
  isValidName,
  isValidCpf,
  isValidPhone,
  isValidEmail,
};
