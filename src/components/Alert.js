import React from 'react'

function Alert(props) {
    const capitalize = (word)=>{
          if(word==="danger"){
            word = "error"
          }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      {props.alert && (
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert" style={{boxShadow:'3px 3px 5px rgba(0, 0, 0, 0.5)'}}>
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
    
    )
}

export default Alert