import CardChart from "@/components/profile/card-chart"

const ProgressTracking = () => {
  const moment = require('moment')

  const dailyData = []

  for (let i = 0; i < 7; i++) {
    dailyData.push({
      date: moment().startOf('week').add(i, 'days').format('MMM DD, YYYY'),
      count: Math.floor(Math.random() * 10)
    })
  }

  const dummyData = {
    difference: Math.floor(Math.random() * 10),
    daily: dailyData
  }

  return (
    <CardChart data={dummyData} />
  )
}

export default ProgressTracking