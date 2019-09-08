import React from "react";

import {
    Route,
    NavLink,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import request from "superagent";

import './home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            new_link: "",
            links: []
        };
    }

    componentWillMount() {
        this.loadLinks()
    }

    loadLinks(e) {
        this.setState({ loading: true, links: [] }, () => {
            request
                .get('http://localhost:8000/load-links')
                .then((results) => {
                    this.setState({
                        links: results.body,
                        loading: false,
                    });
                })
                .catch((err) => {
                    this.setState({
                        loading: false,
                    });
                })
        });
    }

    handleChange(e) {
        this.setState({new_link: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault()

        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

        if (!pattern.test(this.state.new_link)) {
            alert('Url doesn\'t seem to be valid.')

            return false
        }

        request
            .post('http://localhost:8000/submit-link')
            .send({ new_link: this.state.new_link })
            .then((results) => {
                var new_links = this.state.links

                new_links.unshift(results.body)

                this.setState({
                    new_link: "",
                    links: new_links
                })
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                });
            })
    }

    render() {
        let ifLoading

        if (this.state.loading) {
            ifLoading = 'Loading...'
        } else {
            ifLoading = ''
        }

        return (
            <div className="home-container container" style={{ padding: "100px 0"}}>

                <h1>Url Shortener</h1>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <div className="eight columns">
                            <input className="u-full-width" name="new_link" type="text" value={this.state.new_link} onChange={this.handleChange.bind(this)} placeholder="https://google.com" />
                        </div>

                        <div className="four columns">
                            <input className="button-primary" type="submit" value="Shorten" />
                        </div>
                    </div>
                </form>

                <div className="shortned-links">
                    {this.state.links.map(link => (
                        <div className="row" key={link.shortened_link}>
                            <NavLink to={{ pathname: "/shortened/" + link.code, link: link }} className="shortened-link" activeClassName="active">
                                <b>{link.shortened_link}</b>
                                <br />
                                <span>{link.original_link}</span>
                                <br />
                                <span className="shortened-statistics">{link.clicks_total ? link.clicks_total : 0} clicks total • {link.clicks_today ? link.clicks_today : 0} clicks today</span>
                            </NavLink>
                        </div>
                    ))}

                    {ifLoading}
                </div>
            </div>
        );
    }
}

export default Home;