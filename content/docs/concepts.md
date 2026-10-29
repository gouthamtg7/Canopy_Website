---
title: Concepts
description: Nodes, edges, confidence tiers, Codebase maps, and predicted Runtime workflows.
slug: concepts
order: 2
---

# Concepts

## Nodes

A node is a source entity such as a route, component, service, function, database call, or external integration. Nodes link back to the code that contains them.

## Edges

An edge is a relationship found between nodes, such as an import, function call, route link, HTTP request, or database operation. Solid edges are explicit. Dashed edges are inferred.

## Confidence tiers

| Tier | Definition |
| --- | --- |
| **Exact** | The URL and route are written out in full, using the same method and path. |
| **Resolved** | A base URL is followed through the project's own configuration: environment variable, Docker Compose, proxy, or port. |
| **Inferred** | Any other relationship. It is shown dashed rather than presented as certain. |

## Codebase and predicted Runtime

**Codebase** means what the code contains and calls per service. It is derived from static source analysis.

**Runtime (predicted)** is one workflow end to end across services, predicted from the code. It is not a recorded runtime trace. Dynamic dispatch, runtime-generated URLs, queue names, and server-to-browser messages may therefore remain inferred or incomplete.

## Changes view

The Changes view shows what changed since you last looked at the map. It is an architectural comparison, not a replacement for a source diff or runtime test.
