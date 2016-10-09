import React, { Component, PropTypes as T } from 'react';
import Icon from 'react-fa';
import WebCard from './WebCard';

export default class HOCWebCard extends Component {
  static propTypes = {
    blockProps: T.shape({ url: T.string.isRequired, onDelete: T.func.isRequired }).isRequired,
    offsetKey: T.string.isRequired,
    block: T.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = { loading: true, errors: null, data: null };
  }
  componentDidMount() {
    // Mock request og data
    setTimeout(() => {
      this.setState({
        loading: false,
        errors: null,
        data: {
          title: 'Get notified with Oneteam updates in Slack channels',
          description: 'We\'ve released an update that supports connecting with Slack to receive Oneteam updates on Slack channels',
          image: 'https://blog.one-team.com/images/2016-09-16-slack-notifications/screen.png'
        }
      });
    }, 3000);
  }
  renderLoadingSpinner() {
    return <div style={{
      height: 150,
      textAlign: 'center',
      border: '1px solid #eee',
      borderRadius: 12,
      overflow: 'hidden',
      paddingTop: 65
    }}><Icon name='refresh' spin /></div>;
  }
  renderRemove() {
    const { block, blockProps: { onDelete } } = this.props;
    return <span
      onClick={() => onDelete(block)}
      style={this.removeButtonStyle}><Icon name='close' /></span>;
  }
  render() {
    const { offsetKey, blockProps: { url } } = this.props;
    const { loading, data } = this.state;
    return loading ? this.renderLoadingSpinner() : data ? <div style={{ position: 'relative' }}>
      <WebCard
        data-offset-key={offsetKey}
        url={url}
        title={data.title}
        description={data.description}
        image={data.image}
        contentEditable={false}
        suppressContentEditableWarning />
      {this.renderRemove()}
    </div> : null;
  }
  get removeButtonStyle() {
    return {
      position: 'absolute', top: 0, right: 0, width: 32, height: 32, textAlign: 'center', paddingTop: 5,
      borderRadius: '50%', border: '1px solid #ddd', color: '#999', cursor: 'pointer'
    };
  }
}
