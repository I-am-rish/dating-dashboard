import React from 'react';

const Footer = () => {
    return (
        <>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; {new Date().getFullYear()}</div>
                            {/* <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div> */}
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Footer;
