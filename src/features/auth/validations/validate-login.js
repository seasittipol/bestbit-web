export const validateLogin = data => {
    const { email, password } = data
    if (email.trim() === '' || email.indexOf('@') < 0) {
        throw new Error('email is not match')
    }
    if (password.trim() === '' || password.length < 6) {
        throw new Error('require password more than 5 character')
    }
}