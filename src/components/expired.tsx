export function Expired() {
    const expiration = localStorage.getItem("timer");
    if (!expiration) return true
    const currentTime = new Date().getTime();
    return currentTime > parseInt(expiration); 
}
