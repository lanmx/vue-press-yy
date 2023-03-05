## axios请求成功依然跑catch

这是因为请求成功的代码里有错误，因此会跑catch

敲代码的时候不建议写catch，因为有catch的时候，请求成功的代码有错是不会报错的，会跑catch，因此检查不了错误代码


<Valine></Valine>