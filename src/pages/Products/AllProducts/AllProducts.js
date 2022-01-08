import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { isEmpty } from "lodash";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import * as moment from "moment";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Badge,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

//redux
import { useSelector, useDispatch } from "react-redux";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

import {
  getProducts as onGetProducts,
} from "store/actions";

import EcommerceProductsModal from "./EcommerceOrdersModal";

const AllProducts = props => {
  const dispatch = useDispatch();

  const { products } = useSelector(state => ({
    products: state.ecommerce.products,
  }));

  const selectRow = {
    mode: "checkbox",
  };

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [productList, setProductList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: products.length, // replace later with size(products),
    custom: true,
  };
  const { SearchBar } = Search;

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }
  const toggleViewModal = () => setModal1(!modal1);

  const EcommerceProductColumns = toggleModal => [
    {
      dataField: "mainImage",
      text: "Image",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <img style={{ height: 55, width: 50 }} src={row.mainImage} />

      ),
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "varientCount",
      text: "Varients",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => row.varientCount + " Varients",
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Badge
          className={"font-size-12 color-white badge bg-success rounded-pill"}
          color={"#fff"}
          pill
        >
          {row.status}
        </Badge>
      ),
    },
    {
      dataField: "selPrice",
      text: "Price",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => "$" + row?.selPrice,
    },
    {
      dataField: "quantity",
      text: "Inventory",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => row?.quantity + " In Stock",
    },
    {
      dataField: "pCategory",
      text: "Category",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => row.pCategory?.name,
    },
    {
      dataField: "brand",
      text: "Vendor",
      sort: true,
    },

    {
      dataField: "view",
      isDummyField: true,
      text: "View Details",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: () => (
        <Button
          type="button"
          color="primary"
          className="btn-sm btn-rounded"

        >
          View Details
        </Button>
      ),
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, product) => (
        <>
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-success"
              onClick={() => handleProductClick(product)}
            >
              <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
              </UncontrolledTooltip>
            </Link>
            <Link
              to="#"
              className="text-danger"
              onClick={() => handleDeleteProduct(product)}
            >
              <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
              </UncontrolledTooltip>
            </Link>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (products && !products.length) {
      dispatch(onGetProducts({ page: 1, perPage: 10 }));
    }
  }, [dispatch, products]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    if (!isEmpty(products) && !!isEdit) {
      setProductList(products);
      setIsEdit(false);
    }
  }, [products]);

  const toggle = () => {
    setModal(!modal);
  };

  const toLowerCase1 = str => {
    return str.toLowerCase();
  };

  const handleProductClick = arg => {
    // const product = arg;

    // setProductList({
    //   id: product.id,
    //   productId: product.productId,
    //   billingName: product.billingName,
    //   productdate: product.productdate,
    //   total: product.total,
    //   paymentStatus: product.paymentStatus,
    //   paymentMethod: product.paymentMethod,
    //   badgeclass: product.badgeclass,
    // });

    // setIsEdit(true);

    // toggle();
  };

  var node = useRef();
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  const handleDeleteProduct = product => {
    if (product._id !== undefined) {
      // dispatch(onDeleteProduct(product));
      // onPaginationPageChange(1);
    }
  };

  const handleValidProductSubmit = (e, values) => {
    if (isEdit) {
      const updateProduct = {
        id: productList.id,
        productId: values.productId,
        billingName: values.billingName,
        productdate: values.productdate,
        total: values.total,
        paymentStatus: values.paymentStatus,
        paymentMethod: values.paymentMethod,
        badgeclass: values.badgeclass,
      };

      // update product
      dispatch(onUpdateProduct(updateProduct));
    } else {
      const newProduct = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        productId: values["productId"],
        billingName: values["billingName"],
        productdate: values["productdate"],
        total: values["total"],
        paymentStatus: values["paymentStatus"],
        paymentMethod: values["paymentMethod"],
        badgeclass: values["badgeclass"],
      };
      // save new product
      dispatch(onAddNewProduct(newProduct));
    }
    toggle();
  };

  const handleProductClicks = () => {
    setProductList("");
    setIsEdit(false);
    toggle();
  };

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const defaultSorted = [
    {
      dataField: "productId",
      product: "desc",
    },
  ];

  return (
    <React.Fragment>
      <EcommerceProductsModal isOpen={modal1} toggle={toggleViewModal} />
      <div className="page-content">
        <MetaTags>
          <title>All Products | Givingz</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Products" breadcrumbItem="All Products" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={EcommerceProductColumns(toggle)}
                    data={products}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={products}
                        columns={EcommerceProductColumns(toggle)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Link to="/addProduct">
                                    <Button
                                      type="button"
                                      color="success"
                                      className="btn-rounded  mb-2 me-2"

                                    >
                                      <i className="mdi mdi-plus me-1" />
                                      Add New Product
                                    </Button>
                                  </Link>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField="id"
                                    responsive
                                    bproducted={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    selectRow={selectRow}
                                    classes={
                                      "table align-middle table-nowrap table-check"
                                    }
                                    headerWrapperClasses={"table-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    ref={node}
                                  />
                                </div>
                                <Modal isOpen={modal} toggle={toggle}>
                                  <ModalHeader toggle={toggle} tag="h4">
                                    {!!isEdit ? "Edit Product" : "Add Product"}
                                  </ModalHeader>
                                  <ModalBody>
                                    <AvForm
                                      onValidSubmit={handleValidProductSubmit}
                                    >
                                      <Row form>
                                        <Col className="col-12">
                                          <div className="mb-3">
                                            <AvField
                                              name="productId"
                                              label="Product Id"
                                              type="text"
                                              errorMessage="Invalid productId"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={productList.productId || ""}
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="billingName"
                                              label="Billing Name"
                                              type="text"
                                              errorMessage="Invalid Billing Name"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                productList.billingName || ""
                                              }
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="productdate"
                                              label="Date"
                                              type="date"
                                              errorMessage="Invalid Date"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={productList.productdate || ""}
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="total"
                                              label="Total"
                                              type="text"
                                              errorMessage="Invalid Total"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={productList.total || ""}
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="paymentStatus"
                                              label="Payment Status"
                                              type="select"
                                              className="form-select"
                                              errorMessage="Invalid Payment Status"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                productList.paymentStatus || ""
                                              }
                                            >
                                              <option>Paid</option>
                                              <option>Chargeback</option>
                                              <option>Refund</option>
                                            </AvField>
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="badgeclass"
                                              label="Badge Class"
                                              type="select"
                                              className="form-select"
                                              errorMessage="Invalid Badge Class"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={productList.badgeclass || ""}
                                            >
                                              <option>success</option>
                                              <option>danger</option>
                                              <option>warning</option>
                                            </AvField>
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="paymentMethod"
                                              label="Payment Method"
                                              type="select"
                                              className="form-select"
                                              errorMessage="Invalid Payment Method"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                productList.paymentMethod || ""
                                              }
                                            >
                                              <option>Mastercard</option>
                                              <option>Visa</option>
                                              <option>Paypal</option>
                                              <option>COD</option>
                                            </AvField>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <div className="text-end">
                                            <button
                                              type="submit"
                                              className="btn btn-success save-user"
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </Col>
                                      </Row>
                                    </AvForm>
                                  </ModalBody>
                                </Modal>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

AllProducts.propTypes = {
  products: PropTypes.array,
  onGetProducts: PropTypes.func,
  onAddNewProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  onUpdateProduct: PropTypes.func,
};

export default withRouter(AllProducts);
