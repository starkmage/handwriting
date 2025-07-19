const createSecret = (secret) => {
  return {
    getSecret() {
      return secret
    },
    setSecret(newValue) {
      secret = newValue
    }
  }
}

const box = createSecret('myPassword');
console.log(box.getSecret()); // 'myPassword'
box.setSecret('newPass');
console.log(box.getSecret()); // 'newPass'