import React from 'react'

const SurveyConfirmation = (props) => (
  <div className='container-fluid page-centered'>
    <div className='jumbotron jumbotron-fluid'>
      <div className='col-md-12' style={{textAlign: '-webkit-center', MozTextAlignLast: 'center'}}>
        <h1 className='display-3'>¡La encuesta ha sido enviada!</h1>
        <div className='col-md-12 lead'>
          { props.msg.subjects.map((subject) => {
            return(
              <div key={subject.name} className='col-md-12 form-control' style={{display: 'inline-flex', padding: 3 + 'px'}}>
                <div className='col-md-6'>Materia : {subject.subject_name}</div>
                <div className='col-md-6'>{subject.time}</div>
              </div>
            )
          })
          }
        </div>
        <div className='col-md-12 lead' style={{textAlign: 'center', fontWeight: 'bolder', paddingTop: 15 + 'px'}}>
          <span>Si queres editar hace click aqui :
            <a target='_blank' href={props.msg.link}>  {props.msg.link}</a>
          </span>
        </div>
      </div>
    </div>
  </div>
)

export default SurveyConfirmation