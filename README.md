# order

# API to create an order

It is done using the post method (to '/api/orders') of the express libray while passing the order json as body in request object

# Api to get status

It is done using get method (to '/api/orders/status/:id' ) of the express library while passing the id as paramater

it uses the following algorithm to get the status of an order based on the 'trips' property

```mermaid
flowchart TB
    it[start at first trip] -->ct
    ct[trip status] --> ns[not started] & op & itr & od & d
    op[out for pickup] ----> os
    itr[in transit] ----> os
    od[out for delivery] ----> os
    d[delivered] --> c[next trip]
    ns --> st1[orderStatus : ready for pickup]
    os[orderStatus: tripStatus] --> f
    st1 --> f[response json :- \norderStatus: \nshipperName: \nfrom:\nto: ]
    c --> false --> m[orderStatus: delivered] --> f
    c --> true  --> ct
```
