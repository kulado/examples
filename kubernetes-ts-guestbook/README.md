[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new?template=https://github.com/kulado/examples/tree/master/kubernetes-ts-guestbook/components)

# Kubernetes Guestbook (Two Ways)

A port of the standard [Kubernetes Guestbook](https://kubernetes.io/docs/tutorials/stateless-application/guestbook/)
to Kulado. This example shows you how to build and deploy a simple, multi-tier web application using Kubernetes and
Docker, and consists of three components:

* A single-instance Redis master to store guestbook entries
* Multiple replicated Redis instances to serve reads
* Multiple web frontend instances

There is an [interactive Tutorial available](https://kulado.io/quickstart/kubernetes/tutorial-guestbook.html) for
this example. If this is your first time using Kulado for Kubernetes, we recommend starting there.

In this directory, you will find two variants of the Guestbook:

1. [simple/](./simple) is a straight port of the original YAML.
2. [components](./components) demonstrates benefits of using a real language, namely eliminating boilerplate through
   the use of real component abstractions.

Both examples provision the exact same Kubernetes Guestbook application, but showcase different aspects of Kulado.
