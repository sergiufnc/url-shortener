import React from "react";

import {
    Route,
    Link,
    NavLink,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import request from "superagent";
import TimeAgo from 'react-timeago'

import './shortened.css';

class Shortened extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: props.match.params.code,
            link: props.location.link ? props.location.link : null,
            redirects: []
        };
    }

    componentWillMount() {
        this.loadData()
    }

    loadData() {
        request
            .get('http://localhost:8000/load-link/' + this.state.code)
            .then((results) => {
                if (!this.state.link) {
                    this.setState({ link: results.body.link });
                }

                this.setState({ redirects: results.body.redirects });
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                });
            })
    }

    render() {
        if (!this.state.link) {
            return (
                <div className="shortened container" style={{ padding: "100px 0", "text-align": "center"}}>
                    Loading...
                </div>
            )
        }

        return (
            <div className="shortened container" style={{ padding: "100px 0"}}>

                <Link to={"/"}>
                    Go back
                </Link>

                <br />
                <br />

                <div><b>Shorten URI</b></div>
                <div className="shortened-title">
                    <a href={this.state.link.shortened_link} target="_blank">{this.state.link.shortened_link}</a>
                </div>

                <br />

                <div><b>Original URI</b></div>
                <div className="shortened-subtitle">
                    <a href={this.state.link.original_link} target="_blank">{this.state.link.original_link}</a>
                </div>

                <div className="shortened-redirects">
                    {this.state.redirects.map(redirect => (
                        <div className="shortened-redirect">
                            <span>Someone visited </span> <TimeAgo date={redirect.created_at} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Shortened;