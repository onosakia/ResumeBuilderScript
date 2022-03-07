import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { saveStepAction } from 'actions/resume'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ZButton, ZButtonGroupFooter } from 'components/themes.js'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import { GetNextSection, GetPrevSection } from 'utils/constants/index'
import EditorWrapper from 'containers/EditorWrapper'
import draftToHtml from 'draftjs-to-html'
import './Addi.scss'

/**
 * @page
 * @route /resume/section/addi
 * @subpage Additional Information page
 *
 *
 * @version 0.0.1
 */

const PageAddi = () => {
  const info = useSelector(state => state.resume.info)
  const dispatch = useDispatch()
  const history = useHistory()

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(info.fnlz.addi || '')),
    ),
  )

  const currentContent = editorState.getCurrentContent()
  const rawContentState = convertToRaw(currentContent)
  const markup = draftToHtml(rawContentState)

  const onBack = () => {
    const current = 'addi'
    const prevTag = GetPrevSection(info.more, current)
    dispatch(saveStepAction('fnlz', { ...info.fnlz, [current]: markup }))
    if (prevTag === 'add-section') history.push(`/resume/add-section`)
    else history.push(`/resume/section/${prevTag}`)
  }

  const onNext = () => {
    const current = 'addi'
    const nextTag = GetNextSection(info.more, current)
    dispatch(saveStepAction('fnlz', { ...info.fnlz, [current]: markup }))
    history.push(`/resume/section/${nextTag}`)
  }

  return (
    <Container className='section-addi'>
      <Row className='page-title-wrap'>
        <Col xs={12} className='col-page-title'>
          <h1 className='page-title'>Additional Information</h1>
          <p className='sub-title'>Add anything else you want employers to know.</p>
        </Col>
      </Row>
      <EditorWrapper
        editorState={editorState}
        setEditorState={setEditorState}
        editorPlaceholder='Add your details here.'
        editorOnly
        className='addi-editor'
      />
      <ZButtonGroupFooter>
        <ZButton variant='default' onClick={onBack}>
          Back
        </ZButton>
        <ZButton variant='primary' onClick={onNext}>
          SAVE & NEXT
        </ZButton>
      </ZButtonGroupFooter>
    </Container>
  )
}

PageAddi.propTypes = {}

export default PageAddi
