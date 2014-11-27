/** @jsx React.DOM */

(function(){
  var CommentAttachmentStore = require('../stores/comment_attachment_store');
  var TypeaheadUserTextArea = require('./typeahead_user_textarea.js.jsx');

  var MarkdownEditor = React.createClass({
    propTypes: {
      id: React.PropTypes.string,
      inputName: React.PropTypes.string,
      name: React.PropTypes.string.isRequired
    },

    getDefaultProps: function() {
      var props = {
        inputId: 'comment_attachments',
        inputName: 'comment[attachments][]'
      };

      var attachmentUploadUrlTag = $('meta[name=attachment-upload-url]');

      if (attachmentUploadUrlTag) {
        props.url = attachmentUploadUrlTag.attr('content')
      } else {
        console.warn('No attachment upload URL was found. Attachments might fail to upload.');
      }

      return props;
    },

    getInitialState: function() {
      return {
        attachments: []
      };
    },

    componentDidMount: function() {
      // TODO: move this garbage to React
      var dzView = new DropzoneView({
        el: this.getDOMNode(),
        url: this.props.url,
        selectEl: this.refs.file.getDOMNode()
      });

      new MarkdownEditorView({el: this.getDOMNode(), dropzone: dzView.dz});

      CommentAttachmentStore.addChangeListener(this.updateAttachments);
    },

    render: function() {
      return (
        <div className="markdown-editor-control dropzone">
          {this.renderAttachmentInputs()}
          <TypeaheadUserTextArea
              {...this.props}
              className="form-control"
              rows="4"
              id={this.props.id || 'markdown-editor'}
              style={{height: '176px'}}
              required={this.props.required || "false"} />
          <div className="dropzone-inner">
            To attach files drag &amp; drop here or&nbsp;
            <a className="clickable" ref="file">select files from your computer</a>...
          </div>
        </div>
      );
    },

    renderAttachmentInputs: function() {
      return this.state.attachments.map(function(attachmentId) {
        return <input id={this.props.inputId} name={this.props.inputName} type="hidden" value={attachmentId} />
      }.bind(this))
    },

    updateAttachments: function() {
      this.setState({
        attachments: CommentAttachmentStore.getAttachments($(this.getDOMNode()).data('reactid'))
      });
    }
  });

  if (typeof module !== 'undefined') {
    module.exports = MarkdownEditor
  }

  window.MarkdownEditor = MarkdownEditor
})()
