export const validateRegister = data => {
    const { email, mobile, password, confirmPassword } = data
    if (email.trim() === '' || email.indexOf('@') < 0) {
        throw new Error('email is not match')
    }
    if (mobile.trim() === '' || typeof mobile !== 'number' || mobile.length !== 10) {
        throw new Error('mobile is incorrect')
    }
    if (password.trim() === '' || password.length < 6) {
        throw new Error('require password more than 5 character')
    }
    if (confirmPassword !== password) {
        throw new Error('confirm is not match password')
    }
}