const PageHeader = ({ title, subtitle }) => {
    return (
      <div className="page-header">
        <h1 className="title">
          {title}
          <span className="title-accent"></span>
        </h1>
        <p className="subtitle">{subtitle}</p>
      </div>
    )
  }
  
  export default PageHeader
  
  