let interval = null;

export const isTokenValid = (expiresAt) => {

    if (interval) {
        clearInterval(interval)
    }
    
    interval = setInterval(() => {
        const time = new Date()
        const currentTimestamp = Date.parse(time)/1000
        if (currentTimestamp > expiresAt) {
            localStorage.removeItem("passport")
            clearInterval(interval)

        }
    }, 60000)
}