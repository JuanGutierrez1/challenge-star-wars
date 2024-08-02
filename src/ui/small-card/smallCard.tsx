import './smallCard.css'

export const SmallCard = ({ header, content }: { header?: string, content: string }) => {
  return (
    <div className="small-card" >
      {header && (
        <div className="small-card-header" >
          <p>{header}</p>
        </div>
      )}
      <div className="small-card-content">
        <p>{content}</p>
      </div>
    </div>
  )
}