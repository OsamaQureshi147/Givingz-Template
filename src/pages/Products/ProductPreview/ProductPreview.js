import React, { useState } from "react"

import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import {
  Button,
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane,
} from "reactstrap"
import classnames from "classnames"
import { isEmpty } from "lodash"

//Import Star Ratings
import StarRatings from "react-star-ratings"

//Import Product Images
import { productImages } from "assets/images/product"

const ProductDetail = ({ product,uploadProduct,addingProduct }) => {
  const [activeTab, setActiveTab] = useState("1")
  const [images, setImages] = useState(product?.images)

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const imageShow = (img, id) => {
    const expandImg = document.getElementById("expandedImg" + id)
    expandImg.src = img
  }

  const discount =
    100 - Math.floor((product?.sellingPrice / product?.regularPrice) * 100)
  const isDiscount = product?.sellingPrice < product?.regularPrice

  return (
    <React.Fragment>
      {!isEmpty(product) && (
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col xl="6">
                    <div className="product-detai-imgs">
                      <Row>
                        <Col md="2" xs="3">
                          <Nav className="flex-column" pills>
                          {images &&
                          images.map((option, i) => (
                            <NavItem key={i}>
                              <NavLink
                                className={classnames({
                                  active: activeTab === `${i+1}`,
                                })}
                                onClick={() => {
                                  toggleTab(`${i+1}`)
                                }}
                              >
                                <img
                                  src={images[i]?.preview}
                                  alt=""
                                  onClick={() => {
                                    imageShow(images[i]?.preview, 1)
                                  }}
                                  className="img-fluid mx-auto d-block rounded"
                                />
                              </NavLink>
                            </NavItem>
                          ))}
                          </Nav>
                        </Col>
                        <Col md={{ size: 7, offset: 1 }} xs="9">
                          <TabContent activeTab={activeTab}>
                            {images?.map((_img,i)=>(
                              <TabPane key={i} tabId={`${i + 1}`}>
                              <div>
                                <img
                                  src={images[i]?.preview}
                                  alt=""
                                  id="expandedImg1"
                                  className="img-fluid mx-auto d-block"
                                />
                              </div>
                            </TabPane>
                            ))}
                            
                            {/* <TabPane tabId="2">
                              <div>
                                <img
                                  src={product?.image[0]?.preview}
                                  id="expandedImg2"
                                  alt=""
                                  className="img-fluid mx-auto d-block"
                                />
                              </div>
                            </TabPane>
                            <TabPane tabId="3">
                              <div>
                                <img
                                  src={product?.image[0]?.preview}
                                  id="expandedImg3"
                                  alt=""
                                  className="img-fluid mx-auto d-block"
                                />
                              </div>
                            </TabPane>
                            <TabPane tabId="4">
                              <div>
                                <img
                                  src={product?.image[0]?.preview}
                                  id="expandedImg4"
                                  alt=""
                                  className="img-fluid mx-auto d-block"
                                />
                              </div>
                            </TabPane> */}
                          </TabContent>
                        </Col>
                      </Row>
                    </div>
                  </Col>

                  <Col xl="6">
                    <div className="mt-4 mt-xl-3">
                      <Link to="#" className="text-primary">
                        {product?.category}
                      </Link>
                      <h4 className="mt-1 mb-3">{product?.name}</h4>

                      <p className="text-muted mb-4">SKU: {product?.skuCode}</p>

                      {isDiscount && (
                        <h6 className="text-success text-uppercase">
                          {discount} % Off
                        </h6>
                      )}
                      <h5 className="mb-4">
                        Price :{" "}
                        <span className="text-muted me-2">
                          <del>${product?.regularPrice} USD</del>
                        </span>{" "}
                        <b>${product?.sellingPrice} USD</b>
                      </h5>
                      <h5 className="mb-4">
                        Cashback :{" "}
                        <span>${product?.cashback} USD</span>
                      </h5>
                      <p className="text-muted mb-4">{product?.productDesc}</p>
                      <Row className="mb-3">
                        <Col md="6">
                          {!!product?.sizes?.length && (
                            <div className="product-color">
                              <h5 className="font-size-15">Sizes :</h5>
                              <div className="d-flex" style={{}}>
                                {product?.sizes &&
                                  product?.sizes.map((option, i) => (
                                    <div
                                      key={i}
                                      className="border rounded d-flex justify-content-center align-items-center mb-1"
                                      style={{
                                        width: "150px",
                                        marginRight: 10,
                                        height: "30px",
                                        alignItems: "center",
                                      }}
                                    >
                                      {option}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </Col>
                        <Col md="6">
                          {product?.material &&
                            product?.material.map((item, i) => (
                              <div key={i}>
                                <p className="text-muted">
                                  <i
                                    className={classnames(
                                      "fa fa-caret-right",
                                      "font-size-16 align-middle text-primary me-2"
                                    )}
                                  />
                                  {item}
                                </p>
                              </div>
                            ))}
                        </Col>
                      </Row>
                      <div className="product-color">
                        <h5 className="font-size-15">Categories :</h5>
                        <div className="d-flex" style={{ flexWrap: "wrap" }}>
                          {product?.categories &&
                            product?.categories.map((option, i) => (
                              <div
                                key={i}
                                className="border rounded d-flex justify-content-center align-items-center mb-1"
                                style={{
                                  width: "150px",
                                  marginRight: 10,
                                  height: "30px",
                                  alignItems: "center",
                                }}
                              >
                                {option}
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="product-color mt-2">
                        {product?.colors && (
                          <h5 className="font-size-15">Colors :</h5>
                        )}
                         
                        {product?.colors &&
                          product?.colors.map((option, i) => (
                            
                            <Link key={i} onClick={() => {
                              console.log(option?.images);
                              setImages(option?.images)
                            }}>
                              {option?.swatch ?
                            
                              <img
                              className="product-color-item border rounded"
                              style={{
                                height: "30px",
                                width: "50px",
                                verticalAlign: "inherit",
                              }}
                               src={URL.createObjectURL(option?.swatch[0])}/>
                             
                              :
                              
                              <div
                                className="product-color-item border rounded"
                                style={{
                                  background: option?.color,
                                  height: "30px",
                                  width: "50px",
                                }}
                              ></div>
                              
                              }
                            </Link>
                          ))}
                      </div>
                      {/* <div className="product-color mt-2">
                        {product?.color && (
                          <h5 className="font-size-15">Default Color :</h5>
                        )}
                        
                            <Link to="#">
                              <div
                                className="product-color-item border rounded"
                                style={{
                                  background: product?.color,
                                  height: "30px",
                                  width: "50px",
                                }}
                              ></div>
                              <p>{product?.image?.color}</p>
                            </Link>
                         
                      </div> */}
                    </div>
                  </Col>
                </Row>

                <div className="mt-5">
                  <h5 className="mb-3">Specifications :</h5>

                  <div className="table-responsive">
                    <Table className="table mb-0 table-bordered">
                      <tbody>
                        <tr>
                          <th
                            scope="row"
                            style={{ width: "400px" }}
                            className={"text-capitalize"}
                          >
                            Quantity Available
                          </th>
                          <td>{product?.quantityAvailable}</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ width: "400px" }}
                            className={"text-capitalize"}
                          >
                            Stock
                          </th>
                          <td>
                            {product?.stock == "false"
                              ? "Not Available"
                              : "Available"}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ width: "400px" }}
                            className={"text-capitalize"}
                          >
                            Comments
                          </th>
                          <td>{product?.comments}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className="text-center mt-4">
                      <Button
                        type="button"
                        color="success"
                        className="ms-1 btn mt-2"
                        onClick={uploadProduct}
                        disabled={addingProduct}
                      >
                        <i className="bx bx-upload me-2" />
                        {addingProduct?"Publishing Product...":"Publish Product"}
                        
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </React.Fragment>
  )
}

ProductDetail.propTypes = {
  product: PropTypes.object,
  uploadProduct: PropTypes.func,
  addingProduct: PropTypes.bool,
}

export default ProductDetail
