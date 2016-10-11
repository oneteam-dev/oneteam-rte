import React, { Component, PropTypes as T } from 'react';
import Icon from 'react-fa';
import WebCard from './WebCard';

export default class HOCWebCard extends Component {
  static propTypes = {
    blockProps: T.shape({ url: T.string.isRequired, onDelete: T.func.isRequired }).isRequired,
    offsetKey: T.string.isRequired
  }
  static _resourceCache = {}
  static set resourceCache(data) {
    this._resourceCache = { ...this._resourceCache, [data.url]: data };
  }
  static get resourceCache() {
    return this._resourceCache;
  }
  constructor(props) {
    super(props);
    this.state = { loading: true, errors: null, data: null };
  }
  componentDidMount() {
    // Mock request og data
    this.timer = setTimeout(() => {
      this.setState({
        loading: false,
        errors: null,
        data: {
          url: this.props.blockProps.url,
          title: 'Get notified with Oneteam updates in Slack channels',
          description: 'We\'ve released an update that supports connecting with Slack to receive Oneteam updates on Slack channels',
          image: 'https://blog.one-team.com/images/2016-09-16-slack-notifications/screen.png'
        }
      });
    }, 3000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
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
  renderDelete() {
    const { blockProps: { onDelete } } = this.props;
    return <span
      onClick={() => onDelete()}
      style={this.removeButtonStyle}><Icon name='close' /></span>;
  }
  renderWebCard(data) {
    const { offsetKey, blockProps: { url, imageRemoved, onRemoveImage } } = this.props;
    return (
      <div
        data-offset-key={offsetKey}
        contentEditable={false}
        suppressContentEditableWarning
        style={{ position: 'relative' }}>
        <WebCard
          url={url}
          title={data.title}
          description={data.description}
          image={!imageRemoved ? data.image : undefined}/>
        {!imageRemoved && data.image ?
          <span onClick={onRemoveImage} style={{ border: '1px solid #999', cursor: 'pointer' }}>Remove image</span> : null}
        {this.renderDelete()}
      </div>
    )
  }
  render() {
    const { blockProps: { url } } = this.props;
    const { loading } = this.state;
    // TODO: Dirty code..
    const data = this.constructor.resourceCache[url] || this.state.data;
    if (this.constructor.resourceCache[url]) {
      return this.renderWebCard(data);
    }
    if (data && !this.constructor.resourceCache[url]) {
      this.constructor.resourceCache = data;
    }
    return loading ? this.renderLoadingSpinner() : data ? this.renderWebCard(data) : null;
  }
  get removeButtonStyle() {
    return {
      position: 'absolute', top: 0, right: 0, width: 32, height: 32, textAlign: 'center', paddingTop: 5,
      borderRadius: '50%', border: '1px solid #ddd', color: '#999', cursor: 'pointer'
    };
  }
}
