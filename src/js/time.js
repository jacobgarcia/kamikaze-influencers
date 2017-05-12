class TimeJS {

  static getComponents(remainingTime) {
    return ({
      days: Math.floor(remainingTime/86400),
      hours: Math.floor((remainingTime/3600)%24),
      minutes: Math.floor((remainingTime%3600)/60),
      seconds: Math.floor((remainingTime%3600)%60)
    })
  }

  static secondsTo(userTime) {
    const timeEnd = userTime/1000
    const timeNow = Math.floor(Date.now()/1000)
    return (timeEnd - timeNow)
  }

}

module.exports = TimeJS
