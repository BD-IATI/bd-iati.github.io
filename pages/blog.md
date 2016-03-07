---
layout: page
title: Blog
permalink: /blog/
order: 1
---

<div class="posts">
    {% for post in site.posts %}

        <a href="{{ post.url }}"><h2>{{ post.title }}</h2></a>
        <h4>{{ post.date | date_to_long_string }}</h4>
        <span class="description">{{ include.post.description }}</span>
        {{ post.excerpt | markdownify }}

        <p>
          <a href="{{ post.url }}">Read Post &raquo;</a>
        </p>
    {% endfor %}
</div>