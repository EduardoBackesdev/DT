export function Expired() {
    const expiration = localStorage.getItem("timer");
    if (expiration === null ){
        return false
    }
    const timeNow = new Date().getTime()
    if (parseInt(expiration) > timeNow ){
        return false
    }
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('timer')
    window.location.reload();
    return true
}
