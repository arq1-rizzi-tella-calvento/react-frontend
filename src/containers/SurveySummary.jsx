import React from 'react'

const SurveyConfirmation = (props) => (
  <div className='container page-centered'>
    <div className='jumbotron jumbotron-fluid'>
      <div className='container'>
        <h1 className='display-3'>¡La encuesta ha sido enviada!</h1>
          <p className='lead'>
            { props.msg.subjects.map((subject) => {
              return(
                <div key={subject.name} className='col-md-12 form-group'>
                  <div className='col-md-6'>materia : {subject.subject_name}</div>
                  <div className='col-md-6'>{subject.time}</div>
                </div>
              )
            })
            }
          </p>
          <span>Si queres editar hace click aqui :
              <a target='_blank' href={props.msg.link}>  {props.msg.link}</a>
          </span>
      </div>
    </div>
  </div>
)

export default SurveyConfirmation