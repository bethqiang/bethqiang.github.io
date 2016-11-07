---
layout: page
title: Portfolio
permalink: /portfolio/
---

{% for project in site.portfolio %}

<div class="project">
    <div class="thumbnail">
        <a href="{{ site.baseurl }}{{ project.url }}">
        <img class="thumbnail" src="{{ project.img }}"/>
        <span>  
            <div class="flex-container">
                <div class="flex-items">
                    <h3>{{ project.title }}</h3>
                    <p class="project-description">{{ project.description }}</p>
                </div>
            </div>
        </span>
        </a>
    </div>
</div>

{% endfor %}

<h3 class="center github-link"><a href="https://github.com/bethqiang" target="_blank">View more on GitHub</a></h3>

