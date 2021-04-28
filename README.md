![ci-badge](https://github.com/budget-munchies/budget-munchies-project/workflows/ci-budget-munchies-project/badge.svg)

<a href="https://github.com/DevExpress/testcafe">
    <img alt="Tested with TestCafe" src="https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg">
</a>

As of M2 completion, continuous integration began failing 1 test (landing page) due to timeout. It started happening after merging a branch. 
Here is the error report:

A request to "http://localhost:3000/" has failed

      Error details:

      Failed to complete a request to "http://localhost:3000/" within the

      timeout period. The problem may be related to local machine's

      network or firewall settings, server outage, or network problems

      that make the server inaccessible.

However, testcafe passes ALL test (5) with no problems on local machine. Some crosswiring happened when branches merged, maybe a github issue. I quadrupled checked on my local machine. Application is up and running and all tests pass. 
