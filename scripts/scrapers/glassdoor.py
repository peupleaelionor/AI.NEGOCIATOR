"""
Glassdoor salary scraper using Scrapy.
Usage: python -m scripts.scrapers.glassdoor
"""
import scrapy
from scrapy.crawler import CrawlerProcess


class GlassdoorSpider(scrapy.Spider):
    name = "glassdoor"
    start_urls = [
        "https://www.glassdoor.fr/Salaries/paris-software-engineer-salary-SRCH_IL.0,5_IM10701_KO6,23.htm"
    ]
    custom_settings = {
        "ROBOTSTXT_OBEY": True,
        "DOWNLOAD_DELAY": 2,
        "AUTOTHROTTLE_ENABLED": True,
    }

    def parse(self, response):
        for job in response.css("div.jobInfo"):
            yield {
                "poste": job.css("a.jobTitle::text").get(),
                "salaire": job.css("span.salary::text").get(),
                "ville": response.css("h1::text").re_first(r"Salaires à (\w+)"),
                "expérience": job.css("span.experience::text").get(),
            }
        next_page = response.css("li.next a::attr(href)").get()
        if next_page:
            yield response.follow(next_page, self.parse)


if __name__ == "__main__":
    process = CrawlerProcess(
        settings={
            "FEEDS": {"data/raw/glassdoor.json": {"format": "json"}},
            "USER_AGENT": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        }
    )
    process.crawl(GlassdoorSpider)
    process.start()
