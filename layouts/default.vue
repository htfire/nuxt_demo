<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>
html{
    font-size: 100px;
    font-size: calc(1000vw/37.5);
    font-family: 微软雅黑,"Helvetica Neue", Helvetica, Arial, sans-serif;
    background: #f0f0f0;
    width: 100%;
    /*height: 100%;*/
  }
  *{
    margin: 0;
    padding:0;

  }
  body {
    width: 100%;
    /*height: 100%;*/
    font-size: .14rem;
    line-height: inherit;
    /*-webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    overflow: hidden;*/
  }
  #app {
    width: 100%;
    height: 100%;
  }
  ul,li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #666;
  }
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loading img {
    text-align: center;
  }
  .out_layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    overflow: hidden;
  }
  .content_layout {
    display: block;
    height: initial;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
  }
.button--green
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover
{
  color: #fff;
  background-color: #3b8070;
}
.button--grey
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover
{
  color: #fff;
  background-color: #35495e;
}
</style>
