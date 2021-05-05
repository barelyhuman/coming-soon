(function (scope) {
  function CountdownTimer(options = { endDate: new Date(), elm: null }) {
    if (!options.elm) {
      throw new Error(
        `Need an element to add the timer to, missing options.elm on new CountdownTimer(${options})`
      );
    }

    if (!options.endDate) {
      console.warn(
        "Using tomorrow as the end date since no date was provided on options.elm"
      );
      options.endDate = new Date(new Date().setDate(new Date().getDate() + 1));
    }

    this.endTime = new Date(options.endDate).getTime();
    this.elm = options.elm;
  }

  CountdownTimer.prototype.start = function () {
    setInterval(() => {
      {
        const now = Date.now();
        let container = this.elm;

        if (typeof container !== HTMLElement) {
          container = document.getElementById(this.elm);
        }

        container.innerHTML = formatTimeSpent(this.endTime - now);
      }
    }, 1000);
  };

  function millisecondsToTimeSpent(timeinMills) {
    const secs = 1000;
    const mins = secs * 60;
    const hours = mins * 60;

    const secondsPassed = Math.floor(timeinMills / secs);
    const minutesPassed = Math.floor(timeinMills / mins);
    const hoursPassed = Math.floor(timeinMills / hours);

    const hoursSpent = hoursPassed;
    const minutesSpent = (minutesPassed * mins - hoursPassed * hours) / mins;
    const secondsSpent = (secondsPassed * secs - minutesPassed * mins) / secs;

    return {
      hours: hoursSpent,
      minutes: minutesSpent,
      seconds: secondsSpent,
    };
  }

  function formatTimeSpent(timeinMills) {
    const convertedValues = millisecondsToTimeSpent(timeinMills);
    return `${padTime(convertedValues.hours)}h : ${padTime(
      convertedValues.minutes
    )}m : ${padTime(convertedValues.seconds)}s `;
  }

  function padTime(time) {
    return time < 10 ? "0" + time : time;
  }

  scope.CountdownTimer = CountdownTimer;
})(window);
