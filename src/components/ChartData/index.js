import {Component} from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts'
import './index.css'

class ChartData extends Component {
  renderGraphView = () => {
    const {activeTab, chartData} = this.props
    console.log(chartData)
    console.log(activeTab)
    console.log(chartData)
    const barChartData = chartData.map(each => ({
      date: each.data,
      confirmed: each.value.confirmed,
      tested: each.value.tested,
      deceased: each.value.deceased,
      recovered: each.value.recovered,
      active: each.value.confirmed - each.value.deceased - each.value.recovered,
    }))

    const data = barChartData.slice(barChartData.length - 10)
    console.log(data)

    let colortype = '#9A0E31'
    if (activeTab === 'confirmed') {
      colortype = '#9A0E31'
    } else if (activeTab === 'active') {
      colortype = '#0A4FA0'
    } else if (activeTab === 'recovered') {
      colortype = '#216837'
    } else if (activeTab === 'deceased') {
      colortype = '#474C57'
    }

    return (
      <div className="barCharts-container">
        <BarChart width={1032} height={431} data={data} barSize={45}>
          <XAxis
            dataKey="date"
            stroke={colortype}
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10} // Adjusts vertical spacing
          />

          <Tooltip />
          <Legend />
          <Bar
            dataKey={`${activeTab}`}
            fill={`${colortype}`}
            label={{position: 'top', fill: '#fff'}}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </div>
    )
  }

  graph = (type, color, bgColor) => {
    const {chartData} = this.props
    const LineChartData = chartData.map(each => ({
      date: each.data,
      confirmed: each.value.confirmed,
      tested: each.value.tested,
      deceased: each.value.deceased,
      recovered: each.value.recovered,
      active: each.value.confirmed - each.value.deceased - each.value.recovered,
    }))

    return (
      <div className={{backgroundColor: bgColor}}>
        <LineChart
          width={1018}
          height={328}
          data={LineChartData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={type} stroke={color} />
        </LineChart>
      </div>
    )
  }

  renderLineChartView = () => (
    <>
      <div className="charts confirmed-background">
        {this.graph('confirmed', '#FF073A', '#331427')}
      </div>
      <div className="charts active-background">
        {this.graph('active', '#007BFF', '#132240')}
      </div>
      <div className="charts recovered-background">
        {this.graph('recovered', '#27A243', '#182829')}
      </div>
      <div className="charts deceased-background">
        {this.graph('deceased', '#6C757D', '#1C1C2B')}
      </div>
      <div className="charts tested-background">
        {this.graph('tested', '#9673B9', '#230F41')}
      </div>
    </>
  )

  render() {
    return (
      <div>
        {this.renderGraphView()}
        {this.renderLineChartView()}
      </div>
    )
  }
}

export default ChartData
