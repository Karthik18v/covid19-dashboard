import './index.css'

const Stats = props => {
  const {caseDetails, activeTab, onChangeCategory} = props

  const onClickCategory = eachHeading => {
    if (caseDetails && activeTab) {
      onChangeCategory(eachHeading)
    }
  }

  return (
    <ul className="case-details-container">
      {caseDetails.map(each => (
        <li
          key={each.id}
          style={{color: each.color}}
          onClick={() => onClickCategory(each.heading)}
        >
          <div
            className={
              activeTab === each.heading.toLocaleLowerCase()
                ? `case-details-items active-${each.heading.toLowerCase()}`
                : 'case-details-items'
            }
          >
            <p className="case-details-heading">{each.heading}</p>
            <img
              className="case-image"
              src={each.imageUrl}
              alt={each.heading}
            />
            <p className="case-details-number">{each.number}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Stats
