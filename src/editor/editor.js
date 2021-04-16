import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import React, { Component } from 'react'

class EditorComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             text: '',
             title: '',
             id: ''
        };
    }
    componentDidMount = () => {
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id,
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.props.selectedNote.id !== this.state.id){
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id,
            })
        }
    }
    
    
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.editorContainer}>
                <ReactQuill 
                value={this.state.text} 
                onChange={this.updateBody}
                ></ReactQuill>
            </div>
        )
    }
    updateBody = async (val) => {
        await this.setState({text: val})
        this.update();
    }

    update = debounce(() => {
        this.props.noteUpdate(this.state.id,{
            title: this.state.title,
            body: this.state.text
        })
    },1500);
}

export default withStyles(styles)(EditorComponent)
