export default function Resource({ resource, amount, max }) {
  return <div className="resource-bar">
    <h3>{resource}: {amount}</h3>
    <h5>/{max}</h5>
    <div className="resource-max">
      <div className="resource-amt" style={{ width: amount / max * 100 }}/>
    </div>
  </div>
}