import React, { useState } from "react"
import { Link } from "react-router-dom"
import MetaTags from "react-meta-tags"
import { v4 as uuidv4 } from "uuid"
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Tooltip,
} from "reactstrap"
import Select from "react-select"
import Dropzone from "react-dropzone"
import classnames from "classnames"
import ReactTagInput from "@pathofdev/react-tag-input"
import "@pathofdev/react-tag-input/build/index.css"
import ProductPreview from "../ProductPreview/ProductPreview"
import { validateSummary, validateImages } from "./validation_helper"
import ReactTooltip from "react-tooltip"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { addProduct } from "helpers/products_helper"
import { getHex } from "./constants"
const EcommerceAddProduct = () => {
  const [selectedFiles, setselectedFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState([])
  const [activeTab, setactiveTab] = useState(2)
  const [activeColor, setActiveColor] = useState(false)
  const [activeSize, setActiveSize] = useState(false)
  const [activeMaterial, setActiveMaterial] = useState(false)

  const [passedSteps, setPassedSteps] = useState([1])

  const [formValues, setFormValues] = useState({})

  const [addingProduct, setAddingProduct] = useState(false)

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab]
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
        setPassedSteps(modifiedSteps)
      }
    }
  }
  const [colors, setColors] = React.useState([])
  const [Tagcolors, setTagColors] = React.useState([])
  const [sizes, setSizes] = React.useState([])
  const [toolTips, setToolTips] = React.useState({
    comments: true,
  })
  const [material, setMaterial] = React.useState([])
  const options = [
    { value: "AK", label: "Men-Jeans" },
    { value: "HI", label: "Men-Shirts" },
    { value: "CA", label: "Men-Jackets" },
    { value: "NV", label: "Women-Jeans" },
    { value: "OR", label: "Women-Tops" },
    { value: "WK", label: "Women-Kurta" },
    { value: "KJ", label: "Kids-Jeans" },
    { value: "KT", label: "Kids-T-Shirt" },
    { value: "KS", label: "Kids-Shorts" },
  ]
  const titles = ["Summary & Pricing", "Product Images", "Varients"]

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    const _values = formValues
    _values["images"] = files
    setFormValues(_values)
    setselectedFiles(files)
  }

  function handleAcceptedFile(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    const _values = formValues
    _values["image"] = files
    setFormValues(_values)
    setSelectedFile(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  const setVlues = e => {
    const _values = formValues
    _values[e.target.name] = e.target.value
    setFormValues(_values)
    console.log("e", _values)
  }

  const handleAcceptedFileVarient = (_index, files) => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    const _colors = [...colors]
    _colors[_index]["images"] = files
    setColors(_colors)
    console.log(_colors)
  }
  const handleAcceptedFileSwatch = (_index, files) => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    const _colors = [...colors]
    _colors[_index]["swatch"] = files
    setColors(_colors)
    console.log(_colors)
  }
  const handleSwatchAccept = (files) => {
    const file = [...selectedFile]
    file[0]["swatch"] = files[0]
    setSelectedFile(file);
    console.log(file)
  }

  const onChangeCategory = e => {
    const _categories = []
    e.forEach(element => {
      _categories.push(element.label)
    })

    const _values = formValues
    _values["categories"] = _categories
    setFormValues(_values)
    console.log("values", _values)
  }

  const toggle = target => {
    const _tool = toolTips
    _tool[target] = !_tool[target]
    setToolTips(_tool)
  }

  const uploadProduct = () => {
    let multipleArray = []
    for (var i = 0; i < selectedFiles.length; i++) {
      multipleArray.push(URL.createObjectURL(selectedFiles[i]))
    }
    const productData = {
      productName: formValues?.name,
      productDesc: formValues?.productDesc,
      skuCode: formValues?.skuCode,
      rPrice: Number(formValues?.regularPrice).toFixed(2),
      selPrice: Number(formValues?.sellingPrice).toFixed(2),
      cbPrice: Number(formValues?.cashback).toFixed(2),
      spPrice: formValues?.specialPrice,
      spStart: formValues?.startDate,
      spEnd: formValues?.endDate,
      pCategory: formValues?.categories[0],
      pSub: formValues?.categories,
      bulkList: formValues?.inputList,
      pStock: formValues?.quantityAvailable,
      pStockStatus: formValues?.stock,
      pDefColor: formValues?.color,
      pComments: formValues?.comments,
      pMainImage: URL.createObjectURL(selectedFile[0]),
      pImageGallery: multipleArray,
      pUid: uuidv4(),
      transactionType: "Add",
    }
    const varientData = {
      variantColors: colors,
      variantSizes: sizes,
      variantMaterial: "",
      variantPriceArray: {},
      variantQuantityArray: {},
      variantColorArray: {},
      variantSkuArray: {},
      variantImageArray: {},
      variantProductId: productData.pUid,
    }
    setAddingProduct(true)

    addProduct({ product: productData, varients: varientData })
      .then(res => setAddingProduct(false))
      .catch(() => setAddingProduct(false))
  }

  const deleteFiles = index => {
    const _selectedFiles = [...selectedFiles]
    _selectedFiles.splice(index, 1)
    handleAcceptedFiles(_selectedFiles)
  }
  const deleteFile = index => {
    const _selectedFile = [...selectedFile]
    _selectedFile.splice(index, 1)
    handleAcceptedFile(_selectedFile)
  }

  const setImageColor = (_index, e) => {
    const _values = formValues
    const file = _values["image"]

    file[_index].color = e.target.value
    _values["image"] = file
    setFormValues(_values)
    setSelectedFile(file)
    console.log(file)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Add Product | Givingz</title>
        </MetaTags>
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Products" breadcrumbItem="Add Product" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}
                        >
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1)
                            }}
                            disabled={!(passedSteps || []).includes(1)}
                          >
                            <span className="number">1.</span> Summary & Pricing
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2)
                            }}
                            disabled={!(passedSteps || []).includes(2)}
                          >
                            <span className="number">02</span> Product Images &
                            Varients
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 3 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => {
                              setactiveTab(3)
                            }}
                            disabled={!(passedSteps || []).includes(3)}
                          >
                            <span className="number">03</span> Preview Product
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      {activeTab !== 3 && (
                        <>
                          <CardTitle className="mt-4">
                            {titles[activeTab - 1]}
                          </CardTitle>
                          <CardSubtitle className="mb-4">
                            Fill all information below
                          </CardSubtitle>
                        </>
                      )}
                      <Form>
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId={1}>
                            <>
                              <Row>
                                <Col sm="6">
                                  <div className="mb-3">
                                    <Label htmlFor="productname">
                                      Product Name
                                    </Label>
                                    <Input
                                      id="productname"
                                      name="name"
                                      type="text"
                                      className="form-control"
                                      onChange={setVlues}
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <Label htmlFor="productdesc">
                                      Product Description
                                    </Label>
                                    <textarea
                                      className="form-control mb-3"
                                      id="productdesc"
                                      rows="5"
                                      name="productDesc"
                                      onChange={setVlues}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <Label htmlFor="skuCode">SKU Code</Label>
                                    <Input
                                      id="skuCode"
                                      name="skuCode"
                                      type="text"
                                      className="form-control"
                                      onChange={setVlues}
                                    />
                                  </div>
                                  <Row>
                                    <Col sm="4">
                                      <div className="mb-3">
                                        <Label htmlFor="regularPrice">
                                          Regular Price
                                        </Label>
                                        <Input
                                          id="regularPrice"
                                          name="regularPrice"
                                          type="number"
                                          className="form-control"
                                          onChange={setVlues}
                                        />
                                      </div>
                                    </Col>
                                    <Col sm="4">
                                      <div className="mb-3">
                                        <Label htmlFor="sellingPrice">
                                          Selling Price
                                        </Label>
                                        <Input
                                          id="sellingPrice"
                                          name="sellingPrice"
                                          type="number"
                                          className="form-control"
                                          onChange={setVlues}
                                        />
                                      </div>
                                    </Col>
                                    <Col sm="4">
                                      <div className="mb-3">
                                        <Label htmlFor="cashBackPrice">
                                          CashBack{" "}
                                          <i
                                            data-tip
                                            data-for="cashbackTip"
                                            className="bx bxs-info-circle"
                                          />
                                        </Label>
                                        <ReactTooltip
                                          id="cashbackTip"
                                          place="top"
                                          effect="solid"
                                        >
                                          Total cashback / giveback amount
                                        </ReactTooltip>
                                        <Input
                                          id="cashBackPrice"
                                          name="cashback"
                                          type="number"
                                          className="form-control"
                                          onChange={setVlues}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col sm="6">
                                      <div className="mb-3">
                                        <Label htmlFor="quantityAvailable">
                                          Quantity Available
                                        </Label>
                                        <Input
                                          id="quantityAvailable"
                                          name="quantityAvailable"
                                          type="number"
                                          className="form-control"
                                          onChange={setVlues}
                                        />
                                      </div>
                                    </Col>

                                    <Col sm="6">
                                      <div className="mb-3">
                                        <Label className="control-label">
                                          Stock
                                        </Label>
                                        <select
                                          name="stock"
                                          onChange={setVlues}
                                          className="form-control select2"
                                        >
                                          <option>Select</option>
                                          <option value={1}>In Stock</option>
                                          <option value={0}>
                                            Out of Stock
                                          </option>
                                        </select>
                                      </div>
                                    </Col>
                                  </Row>
                                </Col>

                                <Col sm="6">
                                  <div className="mb-3">
                                    <Label className="control-label">
                                      Categories
                                    </Label>
                                    <Select
                                      classNamePrefix="select2-selection"
                                      name="categories"
                                      placeholder="Choose..."
                                      title="Categories"
                                      options={options}
                                      isMulti
                                      onChange={onChangeCategory}
                                    />
                                  </div>

                                  <div className="mt-3">
                                    <Label htmlFor="comments" id="Tooltip-1">
                                      Comments{" "}
                                      <i
                                        data-tip
                                        data-for="registerTip"
                                        className="bx bxs-info-circle"
                                      />
                                    </Label>
                                    <ReactTooltip
                                      id="registerTip"
                                      place="top"
                                      effect="solid"
                                    >
                                      Something you would like to say to your
                                      customers
                                    </ReactTooltip>
                                    <Input
                                      id="commentsText"
                                      name="comments"
                                      type="text"
                                      className="form-control"
                                      onChange={setVlues}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </>
                          </TabPane>
                          <TabPane tabId={2}>
                            <Row>
                              <Col sm="6">
                                <Dropzone
                                  onDrop={acceptedFiles => {
                                    handleAcceptedFile(acceptedFiles)
                                  }}
                                  maxFiles={1}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div className="dropzone">
                                      <div
                                        className="dz-message needsclick"
                                        {...getRootProps()}
                                      >
                                        <input {...getInputProps()} />
                                        <div className="dz-message needsclick">
                                          <div className="mb-3">
                                            <i className="display-4 text-muted bx bxs-cloud-upload" />
                                          </div>
                                          <h4>
                                            Drop here the main product image
                                            file or click to upload.
                                          </h4>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Dropzone>
                                <div
                                  className="dropzone-previews mt-3"
                                  id="file-previews"
                                >
                                  {selectedFile.map((f, i) => {
                                    return (
                                      <Card
                                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                        key={i + "-file"}
                                      >
                                        <div className="d-flex justify-content-between align-items-center">
                                          <div className="p-2">
                                            <Row className="align-items-center">
                                              <Col className="col-auto">
                                                <img
                                                  data-dz-thumbnail=""
                                                  height="80"
                                                  className="avatar-sm rounded bg-light"
                                                  alt={f.name}
                                                  src={f.preview}
                                                />
                                              </Col>
                                              <Col>
                                                <Link
                                                  to="#"
                                                  className="text-muted font-weight-bold"
                                                >
                                                  {f.name}
                                                </Link>
                                                <p className="mb-0">
                                                  <strong>
                                                    {f.formattedSize}
                                                  </strong>
                                                </p>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col>
                                                <label
                                                  htmlFor="example-color-input"
                                                  className="col-form-label"
                                                >
                                                  Color :
                                                </label>
                                                <div className="">
                                                  <input
                                                    className="form-control form-control-color mw-100"
                                                    type="color"
                                                    name="color"
                                                    defaultValue="#556ee6"
                                                    id="example-color-input"
                                                    onChange={e =>
                                                      setImageColor(i, e)
                                                    }
                                                  />
                                                </div>
                                                </Col>
                                              <Col>
                                              <Col  className="mb-3">
                                    <Label className="control-label">
                                          Swatch
                                        </Label>
                                      {!selectedFile[0].swatch ? (
                                        <Dropzone
                                          onDrop={acceptedFiles => {
                                            handleSwatchAccept(
                                              acceptedFiles
                                            )
                                          }}
                                          maxFiles={1}
                                        >
                                          {({
                                            getRootProps,
                                            getInputProps,
                                          }) => (
                                            <div
                                              className="dropzone"
                                              style={{
                                                minHeight: "40px",
                                                height: "40px",
                                              }}
                                            >
                                              <div
                                                className="needsclick"
                                                {...getRootProps()}
                                              >
                                                <input {...getInputProps()} />
                                                <div
                                                  className="dz-message needsclick"
                                                  style={{
                                                    display: "flex",
                                                    fontSize: "10px",
                                                    padding: "10px",
                                                  }}
                                                >
                                                  <div className="mb-3">
                                                    <i className="display-7 text-muted bx bxs-cloud-upload" />
                                                  </div>
                                                 
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </Dropzone>
                                      ) : (
                                        <div>
                                        <img
                                          style={{
                                            height: "38px",
                                            width: "40px",
                                          }}
                                          key={i}
                                          src={URL.createObjectURL(selectedFile[0]?.swatch)}
                                        />
                                        </div>
                                      )}
                                    </Col>
                                                </Col>
                                              </Row>
                                          </div>
                                          <i
                                            className="text-muted bx bxs-trash"
                                            style={{
                                              marginRight: 10,
                                              fontSize: 20,
                                            }}
                                            onClick={() => setSelectedFile([])}
                                          />
                                        </div>
                                      </Card>
                                    )
                                  })}
                                </div>
                              </Col>
                              <Col sm="6">
                                <Dropzone
                                  onDrop={acceptedFiles => {
                                    handleAcceptedFiles(acceptedFiles)
                                  }}
                                  maxFiles={5}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div className="dropzone">
                                      <div
                                        className="dz-message needsclick"
                                        {...getRootProps()}
                                      >
                                        <input {...getInputProps()} />
                                        <div className="dz-message needsclick">
                                          <div className="mb-3">
                                            <i className="display-4 text-muted bx bxs-cloud-upload" />
                                          </div>
                                          <h4>
                                            Drop here the product gallery images
                                            or click to upload.
                                          </h4>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Dropzone>
                                <div
                                  className="dropzone-previews mt-3"
                                  id="file-previews"
                                >
                                  {!!selectedFiles.length &&
                                    selectedFiles.map((f, i) => {
                                      return (
                                        <Card
                                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                          key={i + "-file"}
                                        >
                                          <div className="d-flex justify-content-between align-items-center">
                                            <div className="p-2">
                                              <Row className="align-items-center">
                                                <Col className="col-auto">
                                                  <img
                                                    data-dz-thumbnail=""
                                                    height="80"
                                                    className="avatar-sm rounded bg-light"
                                                    alt={f.name}
                                                    src={f.preview}
                                                  />
                                                </Col>
                                                <Col>
                                                  <Link
                                                    to="#"
                                                    className="text-muted font-weight-bold"
                                                  >
                                                    {f.name}
                                                  </Link>
                                                  <p className="mb-0">
                                                    <strong>
                                                      {f.formattedSize}
                                                    </strong>
                                                  </p>
                                                </Col>
                                              </Row>
                                              
                                            </div>
                                            <i
                                              className="text-muted bx bxs-trash"
                                              style={{
                                                marginRight: 10,
                                                fontSize: 20,
                                              }}
                                              onClick={() => deleteFiles(i)}
                                            />
                                          </div>
                                        </Card>
                                      )
                                    })}
                                </div>
                              </Col>
                            </Row>
                          
                            <div className="mt-4">
                              <h5>More Info</h5>
                              <p>Please add more details of product below</p>
                              <Row>
                                <Col sm="2" className="mb-1">
                                  <Button
                                    onClick={() => setActiveColor(!activeColor)}
                                    color={
                                      activeColor ? "primary" : "secondary"
                                    }
                                  >
                                    Colors
                                  </Button>
                                </Col>
                                <Col sm="2" className="mb-1">
                                  <Button
                                    onClick={() => setActiveSize(!activeSize)}
                                    color={activeSize ? "primary" : "secondary"}
                                  >
                                    Sizes
                                  </Button>
                                </Col>
                                <Col sm="2" className="mb-1">
                                  <Button
                                    onClick={() =>
                                      setActiveMaterial(!activeMaterial)
                                    }
                                    color={
                                      activeMaterial ? "primary" : "secondary"
                                    }
                                  >
                                    Construction
                                  </Button>
                                </Col>
                              </Row>
                              <Row>
                                {activeColor && (
                                  <Col sm="4" className="mt-4">
                                    <ReactTagInput
                                      tags={Tagcolors}
                                      onChange={newTags => {
                                        const _colorsArray = []
                                        newTags.forEach(element => {
                                          const _obj = { color: element }
                                          _colorsArray.push(_obj)
                                        })
                                        const _values = formValues
                                        _values["colors"] = _colorsArray
                                        setColors(_colorsArray)
                                        setTagColors(newTags)
                                      }}
                                      placeholder="Type color and press enter"
                                    />
                                  </Col>
                                )}
                                {activeSize && (
                                  <Col sm="4" className="mt-4">
                                    <ReactTagInput
                                      tags={sizes}
                                      onChange={newTags => {
                                        const _values = formValues
                                        _values["sizes"] = newTags
                                        setSizes(newTags)
                                      }}
                                      placeholder="Type size and press enter"
                                    />
                                  </Col>
                                )}
                                {activeMaterial && (
                                  <Col sm="4" className="mt-4">
                                    <ReactTagInput
                                      tags={material}
                                      onChange={newTags => {
                                        const _values = formValues
                                        _values["material"] = newTags
                                        setMaterial(newTags)
                                      }}
                                      placeholder="Please type in fabric construction details"
                                    />
                                  </Col>
                                )}
                              </Row>
                            </div>
                            {!!colors.length && (
                              <div
                                className="mt-4"
                                style={{ background: "#F5F5F5", padding: 10 }}
                              >
                                {colors.map((col, i) => (
                                  <Row
                                    key={i}
                                    className="mt-2"
                                    style={{
                                      border: "1px solid #d1d1d1",
                                      marginLeft: 5,
                                      marginRight: 5,
                                      paddingTop: 5,
                                      paddingBottom: 5,
                                      borderRadius: 5,
                                    }}
                                  >
                                    <Col md={3} className="mb-3">
                                    <Label className="control-label">
                                          Images
                                        </Label>
                                      {!col?.images?.length ? (
                                        <Dropzone
                                          onDrop={acceptedFiles => {
                                            handleAcceptedFileVarient(
                                              i,
                                              acceptedFiles
                                            )
                                          }}
                                          maxFiles={5}
                                        >
                                          {({
                                            getRootProps,
                                            getInputProps,
                                          }) => (
                                            <div
                                              className="dropzone"
                                              style={{
                                                minHeight: "40px",
                                                height: "40px",
                                              }}
                                            >
                                              <div
                                                className="needsclick"
                                                {...getRootProps()}
                                              >
                                                <input {...getInputProps()} />
                                                <div
                                                  className="dz-message needsclick"
                                                  style={{
                                                    display: "flex",
                                                    fontSize: "10px",
                                                    padding: "10px",
                                                  }}
                                                >
                                                  <div className="mb-3">
                                                    <i className="display-7 text-muted bx bxs-cloud-upload" />
                                                  </div>
                                                  <p>Upload images</p>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </Dropzone>
                                      ) : (
                                        <div
                                          style={{
                                            height: "40px",
                                            display: "flex",
                                            justifyContent: "start",
                                          }}
                                        >
                                          {col?.images?.map((img, i) => (
                                            <img
                                              style={{
                                                height: "38px",
                                                width: "40px",
                                                marginRight:10,
                                              }}
                                              key={i}
                                              src={URL.createObjectURL(img)}
                                            />
                                          ))}
                                        </div>
                                      )}
                                    </Col>
                                    <Col md={1}>
                                    <Label className="control-label">
                                          Color
                                        </Label>
                                      <input
                                        className="form-control form-control-color mw-100 mb-3"
                                        type="color"
                                        name="color"
                                        defaultValue={getHex(col?.color)}
                                        id="example-color-input"
                                      />
                                    </Col>
                                    <Col md={1} className="mb-3">
                                    <Label className="control-label">
                                          Swatch
                                        </Label>
                                      {!col?.swatch?.length ? (
                                        <Dropzone
                                          onDrop={acceptedFiles => {
                                            handleAcceptedFileSwatch(
                                              i,
                                              acceptedFiles
                                            )
                                          }}
                                          maxFiles={1}
                                        >
                                          {({
                                            getRootProps,
                                            getInputProps,
                                          }) => (
                                            <div
                                              className="dropzone"
                                              style={{
                                                minHeight: "40px",
                                                height: "40px",
                                              }}
                                            >
                                              <div
                                                className="needsclick"
                                                {...getRootProps()}
                                              >
                                                <input {...getInputProps()} />
                                                <div
                                                  className="dz-message needsclick"
                                                  style={{
                                                    display: "flex",
                                                    fontSize: "10px",
                                                    padding: "10px",
                                                  }}
                                                >
                                                  <div className="mb-3">
                                                    <i className="display-7 text-muted bx bxs-cloud-upload" />
                                                  </div>
                                                 
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </Dropzone>
                                      ) : (
                                        <div>
                                        <img
                                          style={{
                                            height: "38px",
                                            width: "40px",
                                          }}
                                          key={i}
                                          src={URL.createObjectURL(
                                            col?.swatch[0]
                                          )}
                                        />
                                        </div>
                                      )}
                                    </Col>
                                    <Col md={2}>
                                    <Label className="control-label">
                                          Sku
                                        </Label>
                                      <input
                                        className="form-control mw-100 mb-3"
                                        type="text"
                                        name="text"
                                        placeholder="sku"
                                        id="example-color-input"
                                      />
                                    </Col>
                                    <Col md={2}>
                                    <Label className="control-label">
                                          Price
                                        </Label>
                                      <input
                                        className="form-control  mw-100 mb-3"
                                        type="number"
                                        name="text"
                                        placeholder="Price"
                                        id="example-color-input"
                                      />
                                    </Col>
                                    <Col md={2}>
                                    <Label className="control-label">
                                          Quantity
                                        </Label>
                                      <input
                                        className="form-control  mw-200 mb-3"
                                        type="number"
                                        name="text"
                                        placeholder="quantity"
                                        id="example-color-input"
                                      />
                                    </Col>
                                    <Col
                                      md={1}
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <i
                                        className="display-7 text-muted bx bxs-trash"
                                        style={{}}
                                        onClick={()=>{
                                          const _colorsTags = [...Tagcolors];
                                          _colorsTags.splice(i,1);
                                          setTagColors(_colorsTags)
                                          const _colors= [...colors];
                                          _colors.splice(i,1);
                                          setColors(_colors);
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                ))}
                              </div>
                            )}
                          </TabPane>

                          <TabPane tabId={3}>
                            {activeTab === 3 && (
                              <ProductPreview
                                uploadProduct={uploadProduct}
                                product={formValues}
                                addingProduct={addingProduct}
                              />
                            )}
                          </TabPane>
                        </TabContent>
                      </Form>
                    </div>

                    <div className="actions clearfix mt-4">
                      <ul>
                        <li
                          className={
                            activeTab === 1 ? "previous disabled" : "previous"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTab - 1)
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={activeTab === 3 ? "next disabled" : "next"}
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              if (activeTab === 1) {
                                const validation = validateSummary(formValues)
                                if (validation) toggleTab(activeTab + 1)
                              } else if (activeTab === 2) {
                                const _validation = validateImages(
                                  selectedFile,
                                  selectedFiles,
                                  formValues
                                )
                                if (_validation) toggleTab(activeTab + 1)
                              }
                            }}
                          >
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EcommerceAddProduct
