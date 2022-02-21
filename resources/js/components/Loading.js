import React, {Fragment} from 'react';
import loading from '../asset/image/loader.gif'

const Loading = () => {
    return (
        <Fragment>
            <div className="container">
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-12">
                        <img src={loading} alt="Loading..." style={{marginTop: '100px'}}/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Loading;
