import React from 'react';
import ImageGridTileStyle from './ImageGridTile.css';
import Img from 'ProportionalImage';

class ImageGridTile extends React.Component{
  /**
   * Creates a tile for image list
   * @param {Object} props
   * @param {String} props.image - image url
   * @param {String} props.placeholder - a placeholder image
   * @param {String} props.placeholderSizing - Sets a sizing option for the placeholder. By default it's the same as for the `src` image, but set to `initial` or other valid `background-size` value to override.
   * @param {String} props.mediatype - a default media icon instead of the placeholder image: one of `image`,`audio`,`video`
   * @param {String} [props.iconColor="#cccccc"] - default placeholder media icon color
   * @param {String} [props.iconSize=48] - default placeholder media icon size
   * @param {String} [props.aspect="16:9"] - aspect ratio of the image to be in the tile
   *
   * @param {String} props.title - title of the video
   * @param {String} props.description - description of the video
   * @param {Boolean} props.actionIcon - icon to display as the action icon. It also has to have a callback attached to it when passed.
   * @param {Function} props.onSelect - callback to be executed when the link is clicked
   * */
  constructor(props){
    super(props);
  }
  render(){
    let actionButton = null;
    if(this.props.actionIcon){
      actionButton = <div className="ImageGridTile--edit"><div className="ImageGridTile--action-icon">{this.props.actionIcon}</div></div>;
    }
    return(
      <div className="ImageGridTile">
        <div className="ImageGridTile--cover" onClick={this.props.onSelect}>
          <Img
            width="100%"
            aspect={this.props.aspect}
            sizing="cover"
            preload="true"
            fade="true"
            alt={this.props.title}
            placeholder={this._computeTileType()}
            placeholderSizing={this.props.placeholderSizing}
            src={this.props.image}
          />
        </div>
        <div className="ImageGridTile--content">
          <div className="ImageGridTile--meta">
            <div className="ImageGridTile--title ellipsis" onClick={this.props.onSelect}>{this.props.title}</div>
            <div className="ImageGridTile--description ellipsis">{this.props.description}</div>
          </div>
          {actionButton}
        </div>
      </div>
    )
  }

  _computeTileType(){
    if(!this.props.placeholder && this.props.mediatype){
      const types = ['image','audio','video'];
      if(types.indexOf(this.props.mediatype)==-1){throw new Error(`Unrecognized type "${this.props.mediatype}" is specified`)}
      let icon = this.constructor.iconServer(this.props.mediatype,this.props.iconSize,this.props.iconColor);
      return 'data:image/svg+xml,' + escape(icon);
    } else {
      return this.props.placeholder
    }
  }

  /**
   * Returns an icon with a correct fill color
   * @param {String} name - icon name (one of `image`, `video`, `audio`)
   * @param {Number} [size=24] - icon size in pixels
   * @param {String} [fill="#cccccc"] - valid CSS color declaration
   * @returns {String}
   * */
  static iconServer(name,size=48,fill="#cccccc"){
    const icons = {
      image: `<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>`,
      audio: `<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>`,
      video: `<path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>`
    };
    if(!icons[name]){throw new Error(`icon "${name}" is not on the list`)}

    return `<svg fill="${fill}" height="${size}" viewBox="0 0 24 24" width="${size}" xmlns="http://www.w3.org/2000/svg">${icons[name]}</svg>`
  }
}

export default ImageGridTile
