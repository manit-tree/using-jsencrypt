async function encrypt() {
    let public_key = await $.get_text('./rsa_1024_pub.pem');
    let private_key = await $.get_text('./rsa_1024_priv.pem');
    let js_encrypt = new JSEncrypt();
    let js_decrypt = new JSEncrypt();
    let encrypted_text;
    let decrypted_text;

    js_encrypt.setPublicKey(public_key);
    encrypted_text = js_encrypt.encrypt('Hello 123');
    console.log(encrypted_text);    

    js_decrypt.setPrivateKey(private_key);
    decrypted_text = js_decrypt.decrypt(encrypted_text);
    console.log(decrypted_text);
}

async function sign() {
    let public_key = await $.get_text('./rsa_1024_pub.pem');
    let private_key = await $.get_text('./rsa_1024_priv.pem');
    let js_sign = new JSEncrypt();
    let js_verify = new JSEncrypt();
    let payload, signature, verified;

    payload = 'Hello 123';
    js_sign.setPrivateKey(private_key);
    signature = js_sign.sign(payload, CryptoJS.SHA256, 'sha256');
    console.log('== generate signature from payload ==');
    console.log(signature);

    js_verify.setPublicKey(public_key);
    verified = js_verify.verify(payload, signature, CryptoJS.SHA256);

    console.log('== verify signature with payload ==');

    if (verified) {
        console.log('signature verified!');
    } else {
        console.log('invalid signature!');
    }
}

$.ready(() => {
    sign();
})

