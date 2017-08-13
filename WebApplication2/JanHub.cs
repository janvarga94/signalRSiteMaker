using HtmlAgilityPack;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2
{
    public class JanHub : Hub
    {
        private static HtmlDocument doc;

        public JanHub() : base()
        {
            if(doc == null)
            {
                doc = new HtmlDocument();
                doc.LoadHtml(@"<body/>");
            }

        }

        public object getInitData()
        {
            return new { connectionId =  Context.ConnectionId, currentDocument = doc.DocumentNode.SelectSingleNode("//body").InnerHtml };
        }

        public void addElement(string htmlElement, string parentId)
        {

            var docy = new HtmlDocument();
            docy.LoadHtml(htmlElement);
            var newElement = docy.DocumentNode.ChildNodes[0];

            if (string.IsNullOrWhiteSpace(parentId))
            {
                HtmlNode body = doc.DocumentNode.SelectSingleNode("//body");
                body.PrependChild(newElement);
            }
            else
            {
                var parent = doc.GetElementbyId(parentId);
                if (parent != null)
                    parent.PrependChild(newElement);
            }

            var outer = doc.DocumentNode.OuterHtml;

            Clients.Others.elementAdded(new { parentId = parentId, newElement = htmlElement });
        }

        public void removeElement(string elementId)
        {

            var element = doc.GetElementbyId(elementId);
            if (element != null && element.Name != "body") {
                element.Remove();
                Clients.Others.elementRemoved(elementId);
            } 

        }

        public void updateElement(string htmlElement)
        {
            var docy = new HtmlDocument();
            docy.LoadHtml(htmlElement);

            var newChild = docy.DocumentNode.ChildNodes[0];
            var idOfNewChild = newChild.Id;

            var oldChild = doc.DocumentNode.SelectSingleNode($"//*[@id={newChild.Id}]");
            if(newChild != null && oldChild != null)
            {
                var parent = oldChild.ParentNode;
                    parent.ReplaceChild(newChild, oldChild);
                Clients.Others.elementUpdated(htmlElement);
            }
        }
    }
}
