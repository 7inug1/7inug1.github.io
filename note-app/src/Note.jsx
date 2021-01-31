import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';

export default class Note extends React.Component {
  render() {
    return <>
      {/* <h1>Notes</h1> */}
      {this.props.filteredNotes.map((filteredNote, key)=>
        <div id="notes">
          <div className="individualNote" key={key} onClick={this.props.handleShow}>
            <h3> 
              Title: {filteredNote.title} 
            </h3>

            <h3> 
              Content: {filteredNote.content} 
            </h3>

            <h3> 
              Tag: 
              {filteredNote.tag.map((tag, key)=>
                <li key={key}>{tag}</li>
              )} 
            </h3>
          </div>

          {/* <div className="modal" key={key}>
          <Modal show={this.props.show} onHide={this.props.handleClose}>
            <Modal.Header>
              <Modal.Title>{filteredNote.title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>{filteredNote.content} </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.props.handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          </div> */}
        </div>
      )}
        
    </>
  }
}

